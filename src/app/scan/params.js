import { useSearchParams } from 'next/navigation'

function GetParams({idorder,idpel}){
  const params = useSearchParams()
  const idpel = params.get('idpel')
  const idorder = params.get('idorder')
}

export default GetParams