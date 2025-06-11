import { Header } from '@/sections/Header'
import { Cliente } from '@/sections/Cliente'
import { Facturacion } from '@/sections/Facturacion'
function App() {

  return (
    <>
      <Header />
      <div className='grid grid-cols-2 gap-4 px-6'>
        <Cliente />
        <Facturacion />
      </div>
    </>
  )
}

export default App
