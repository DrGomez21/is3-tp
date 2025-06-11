import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useState } from 'react'

export const Cliente = () => {

  const [cliente, setCliente] = useState({
    nombre: '',
    apellido: '',
    identificacion: '',
    telefono: '',
    direccion: '',
  })

  const [error, setError] = useState('')
  const [clienteEncontrado, setClienteEncontrado] = useState(null)

  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (cliente.identificacion === '') {
      toast.error('Debe ingresar un CI o RUC', {
        duration: 2000,
        position: 'top-center',
        icon: '🚨',
      })
    } else {
      setError(null)
      setClienteEncontrado(cliente)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Cliente</h1>
      <div className="flex flex-col gap-4">
        <div className="grid w-full max-w-sm items-center gap-2">
          <Label htmlFor="identificacion">CI o RUC</Label>
          <Input type="text" id="identificacion" placeholder="Ej. 1234567" name="identificacion" value={cliente.identificacion} onChange={handleChange} />
          <Button onClick={handleSubmit}>Buscar</Button>
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <div className="flex flex-col w-full max-w-sm justify-start gap-2 border border-black rounded-md p-4">
          {clienteEncontrado ? (
            <>
              <p>Nombre: {clienteEncontrado.nombre}</p>
              <p>Apellido: {clienteEncontrado.apellido}</p>
              <p>CI: {clienteEncontrado.identificacion}</p>
              <p>RUC: {clienteEncontrado.identificacion}</p>
              <p>Teléfono: {clienteEncontrado.telefono}</p>
              <p>Dirección: {clienteEncontrado.direccion}</p>
            </>
          ) : (
            <p className="text-center opacity-70 font-medium text-sm">Aquí se mostrará el cliente encontrado.</p>
          )}
        </div>
      </div>
    </div>
  )
}
