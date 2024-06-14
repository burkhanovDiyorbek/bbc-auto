import { useEffect } from 'react'
import styles from './about.module.css'
import axios from 'axios'

export const About = () => {
  useEffect(()=>{
    const fetchData = async()=>{
      const req = await axios.get("http://bbc.mebel-zakaz.uz/slider/slider/1");
      console.log(req.data);
    }
    fetchData()
  },[])
  return (
    <div className={styles.about}>About</div>
  )
}
