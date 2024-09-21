import './login.css';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../../lib/firebase";
import { doc, setDoc} from "firebase/firestore";
import upload from "../../lib/upload"


const Login = () => {

  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  })

  const [loading, setLoading] = useState(false)

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      })
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true)

    const formData = new FormData(e.target)

    const { username, email, password } = Object.fromEntries(formData);

    try {

      // The res is the result gotten from the formData that has been authenticated

      const res = await createUserWithEmailAndPassword(auth, email, password)

      const imgUrl = await upload(avatar.file)

      // The await below is for creating user profiles the database

      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: {},
      });

      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });

      toast.success("Account created! You can log in now")

    }catch(err) {
      console.log(err)
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true)

    const formData = new FormData(e.target)

    const {email, password } = Object.fromEntries(formData);

    try {

      const res = await signInWithEmailAndPassword(auth, email, password);

    } catch (err) {
      console.log(err)
      toast.error('Invalid details')
    } 
    finally {
      setLoading(false)
    }
  }

  return (
    <div className='login'>
      <div className="item">
        <h2>Welcome back,</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder='Email' name='email' />
          <input type="password" name="password" placeholder="password" />
          <button disabled={loading}>{loading ? 'loading' : 'Sign In'}</button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="" />
            Upload an Image
          </label>
          <input type="file" name="file" id='file'style={{display:"none"}} onChange={handleAvatar}/>
          <input type="text" placeholder='username' name="username" />
          <input type="email" name="email" placeholder="Email" id="email" />
          <input type="password" name="password" placeholder="password" id="password" />
          <button disabled={loading}>{loading ? 'loading' : 'Sign Up'}</button>
        </form>
      </div>
    </div>
  )
}

export default Login