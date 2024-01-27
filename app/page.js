import Image from 'next/image'
import styles from './page.module.css'
import CardList from '@/components/cardList/CardList'


export default function Home() {


  return (
    <main className={styles.main}>
  
      <CardList />
    </main>
  )
}
