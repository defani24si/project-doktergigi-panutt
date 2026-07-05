import { supabase } from '../lib/supabase';

export const authService = {
  /**
   * Register user baru dengan Supabase Auth
   */
  async register(email, password, fullName, role = 'member') {
    try {
      // 1. Sign up dengan Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
          },
        },
      });

      if (authError) throw authError;

      // 2. Profile akan otomatis dibuat via trigger di database
      // Tunggu sebentar agar trigger selesai
      await new Promise(resolve => setTimeout(resolve, 1000));

      return {
        user: authData.user,
        session: authData.session,
      };
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },

  /**
   * Login dengan email dan password
   */
  async login(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Get user profile untuk mendapatkan role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError) {
        console.error('Profile error:', profileError);
        // Jika profile belum ada, return dengan role default
        return {
          user: data.user,
          session: data.session,
          profile: {
            id: data.user.id,
            email: data.user.email,
            role: 'member',
          },
        };
      }

      return {
        user: data.user,
        session: data.session,
        profile,
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },


  /**
   * Logout user
   */
  async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  /**
   * Get current session
   */
  async getSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return session;
    } catch (error) {
      console.error('Get session error:', error);
      throw error;
    }
  },

  /**
   * Get current user with profile
   */
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      if (!user) return null;

      // Get profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Profile error:', profileError);
        return { user, profile: null };
      }

      return { user, profile };
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },

  /**
   * Reset password (send email)
   */
  async resetPassword(email) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  },

  /**
   * Update password
   */
  async updatePassword(newPassword) {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) throw error;
    } catch (error) {
      console.error('Update password error:', error);
      throw error;
    }
  },
};
