export default function HelloWorld(){
    const propsUserCard = {
        nama: "Goku",
        nim: "999999",
        tanggal: "2025-01-01"
    }

    return (
        <div>
            <h1>Hello World</h1>
            <p>Selamat Belajar ReactJs</p>
            <GreetingBinjai/>
            <GreetingBinjai/>
            <GreetingBinjai/>

             <UserCard 
	            nama="Panut" 
	            nim="2457301030"
	            tanggal={new Date().toLocaleDateString()}
	          />

               <UserCard 
	            nama="Jijah" 
	            nim="2457301025"
	            tanggal="25/10/26"
	          />

              <UserCard {...propsUserCard}/>
        </div>
    )
}

function GreetingBinjai(){
    return (
        <small>Salam dari Binjai 😁</small>
    )
}

function UserCard(props){
    return (
        <div>
            <hr/>
            <h3>Nama: {props.nama}</h3>
            <p>NIM: {props.nim}</p>
            <p>Tanggal: {props.tanggal}</p>
        </div>
    )
}