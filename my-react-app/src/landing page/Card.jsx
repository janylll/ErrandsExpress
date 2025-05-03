import profile from '../assets/download.jpeg';
function Card(){
    return(
        <section id="contact">
        <h1 className="title2">Contact Us</h1>
        <div className="card-alignment">
            <div className="card" id='janyl'>
                <img className="card-image" src={profile} alt="Janyl Estores"></img>
                <h2 className="card-name">Janyl Sweet Estores</h2>
                <p className="card-mail">janylsweetv.estores@gmail.com</p>
                <p className="card-name">09123456789</p>
            </div> 
            <div className="card" id='Marc'>
                <img className="card-image" src={profile} alt="Janyl Estores"></img>
                <h2 className="card-name">Marc Ariel H. Eurese</h2>
                <p className="card-mail">blank@gmail.com</p>
                <p className="card-name">09123456789</p>
            </div> 
            <div className="card" id='Dieter'>
                <img className="card-image" src={profile} alt="Janyl Estores"></img>
                <h2 className="card-name">Dieter Macarayan</h2>
                <p className="card-mail">blank@gmail.com</p>
                <p className="card-name">09123456789</p>
            </div> 
        </div>  
        </section>
    );

}
export default Card;