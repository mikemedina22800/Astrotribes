import React, { useState } from "react";
import { auth, provider, db} from "../firebase-config";
import { signInWithPopup} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import { setDoc, doc, collection, addDoc} from "firebase/firestore";
import "../styles/Auth.css";
import logo from "../images/logo.svg";
import icon from "../images/icon.svg";
import close from "../images/close.svg";
import background from "../images/background.jpeg";


function Auth() { 

  let navigate = useNavigate();

  const [signup, setSignup] = useState(false)
  const [heroSection, setHeroSection] = useState(true)
  const [username, setUsername] = useState(null)
  const [birthdate, setBirthdate] = useState(null)
  const [zodiac, setZodiac] = useState(null)
  const [loading, setLoading] = useState(null)

  let signInWithGoogle = () => {
    signInWithPopup(auth, provider).then(() => {
      navigate("/")
    });
  };

  const openSignup = () => {
    setSignup(true);
    setHeroSection(false);
  }

  const closeSignup = () => {
    setSignup(false);
    setHeroSection(true);
  }

  const getZodiac = () => {
    const month = new Date(birthdate).getMonth() + 1
    const day = new Date(birthdate).getDate() + 1
    if (month == 1){
      if(day <= 19){
        setZodiac("Capricornus")
      }else{
        setZodiac("Aquarius")
      }
    }if (month == 2){
      if(day <= 18){
        setZodiac("Aquarius")
      }else{
        setZodiac("Pisces")
      }
    }if (month == 3){
      if(day <= 20){
        setZodiac("Pisces")
      }else{
        setZodiac("Aries")
      }
    }if (month == 4){
      if(day <= 19){
        setZodiac("Aries")
      }else{
        setZodiac("Taurus")
      }
    }if (month == 5){
      if (day <= 20){
        setZodiac("Taurus")
      }else{
        setZodiac("Gemini")
      }
    }if (month == 6){
      if (day <= 21){
        setZodiac("Gemini")
      }else{
        setZodiac("Cancer")
      }
    }if (month == 7){
      if (day <= 22){
        setZodiac("Cancer")
      }else{
        setZodiac("Leo")
      }
    }if (month == 8){
      if (day <= 22){
        setZodiac("Leo")
      }else{
        setZodiac("Virgo")
      }
    }if (month == 9){
      if (day <= 22){
        setZodiac("Virgo")
      }else{
        setZodiac("Libra")
      }
    }if (month == 10){
      if (day <= 23){
        setZodiac("Libra")
      }else{
        setZodiac("Scorpius")
      }
    }if (month == 11){
      if (day <= 21){
        setZodiac("Scorpius")
      }else{
        setZodiac("Sagittarius")
      }
    }if (month == 12){
      if (day <= 21){
        setZodiac("Sagittarius")
      }else{
        setZodiac("Capricornus")
      }
    }
  }

  const signUpWithGoogle = async (e) => {
    e.preventDefault()
    setLoading(true)
    getZodiac()
    signInWithPopup(auth, provider).then(() => {
      setDoc(doc(db, "users", auth.currentUser.uid), {
        name: auth.currentUser.displayName,
        username,
        birthdate,
        zodiac
      })
    })
  }

  return (
    <>
      <img className="background" src={background}/>
      <div className="auth">
        {heroSection && <div className="hero-section">
          <img src={logo}/>
          <p>Let the stars be your guide. Discover your astral community today.</p>
          <div>
            <button className="login-button" onClick={signInWithGoogle}>LOG IN</button>
            <button className="signup-button" onClick={openSignup}>SIGN UP</button>
          </div>   
        </div>}
        {signup && <form className="signup" onSubmit={signUpWithGoogle}>
          <img className="close" src={close} onClick={closeSignup}/>
          <img className="icon" src={icon}/>
          <p>Username</p>
          <input type="text" pattern="[A-Za-z 0-9]{1,30}" title="Username cannot contain any symbols or more than 30 characters." required
          onChange={
            (event) => {
              setUsername(event.target.value);
            }
          }/><br/>
          <p>Birthdate</p>
          <input type="date" min="1900-01-01" max="2008-12-31" required 
          onChange={
            (event) => {
              setBirthdate(event.target.value);
            }
          }/><br/>
          <button disabled={loading} type="submit">Continue</button>
        </form>}
      </div>
    </>
  )
}

export default Auth