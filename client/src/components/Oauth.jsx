import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function Oauth() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
        
        try {
           

            const result = await signInWithPopup(auth, provider);
            console.log(result);
            console.log(result.user.photoURL);

            
            const res = await fetch('/api/auth/oauth/google',{
                  method:"POST",
                  headers:{
                    "Content-type":"application/json",
                  },
                  body: JSON.stringify({name:result.user.displayName,
                    email:result.user.email,
                photo:result.user.photoURL}),
            })
            console.log(res);

            const data = await res.json();

            dispatch(signInSuccess(data));
            navigate('/')

        } catch (error) {
            console.log("could not sign in with google", error);
        }
    }
  return (
    <button type="button" className=" bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95" onClick={handleGoogleClick}>Continue with google</button>
  )
}