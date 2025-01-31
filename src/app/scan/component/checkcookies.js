'use client';

import { useCookies } from 'next-client-cookies';
import { useRouter } from 'next/navigation'

const CheckCookies = () => {
  const router = useRouter()

  const cookies = useCookies();
  const getCookies = cookies.get('my-cookie')

  if (getCookies === 'tessar') {
    router.push('/')
  }else{
    router.push('/login')
  }
}

export default CheckCookies