import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

// Componente de selector de monedas
const MonedaSelector = ({ setMoneda }) => {

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  const monedas = [
    {
      value: "guaranies",
      label: "Guaraníes",
    },
    {
      value: "dolares",
      label: "Dólares",
    },
  ]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? monedas.find((moneda) => moneda.value === value)?.label
            : "Seleccionar moneda..."}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar moneda..." />
          <CommandList>
            <CommandEmpty>No se encontró la moneda.</CommandEmpty>
            <CommandGroup>
              {monedas.map((moneda) => (
                <CommandItem
                  key={moneda.value}
                  value={moneda.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setMoneda(currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === moneda.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {moneda.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export const Facturacion = ({ totales }) => {

  const [moneda, setMoneda] = useState('')

  return (
    <section className="flex flex-col gap-4">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">Facturación</h1>
        <MonedaSelector setMoneda={setMoneda} />
      </header>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold opacity-50">Total a pagar</h3>
          <p className="text-base font-medium">{totales?.total}</p>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold opacity-50">Total impuestos</h3>
          <p className="text-base font-medium">{totales?.impuesto}</p>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold opacity-50">Total exentas</h3>
          <p className="text-base font-medium">{totales?.excentas}</p>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold opacity-50">Total a pagar</h3>
          <p className="text-2xl font-bold p-2 bg-green-200 rounded-md border border-black">{totales?.total}</p>
        </div>
      </div>

      {/* Tabs de pago */}
      <Tabs defaultValue="contado" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="contado">Contado</TabsTrigger>
          <TabsTrigger value="credito">Crédito</TabsTrigger>
        </TabsList>
        <TabsContent value="contado" className="space-y-4 pt-4 w-full">
          <div>
            <Label htmlFor="monto-pagado">Monto a pagar</Label>
            <Input id="monto-pagado" defaultValue={totales?.total.toLocaleString("es")} value={totales?.total.toLocaleString("es")} readOnly />
          </div>
          <div className="w-full">
            <Label htmlFor="metodo-pago">Método de Pago</Label>
            <Select defaultValue="efectivo" className="w-full">
              <SelectTrigger id="metodo-pago" className="w-full">
                <SelectValue placeholder="Seleccionar método" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="efectivo">Efectivo</SelectItem>
                <SelectItem value="tarjeta">Tarjeta</SelectItem>
                <SelectItem value="transferencia">Transferencia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>
        <TabsContent value="credito">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-1 w-full">
              <Label htmlFor="cantidad-cuotas">Cantidad de cuotas</Label>
              <Select defaultValue="3" className="w-full">
                <SelectTrigger id="cantidad-cuotas" className="w-full">
                  <SelectValue placeholder="Seleccionar cantidad de cuotas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 Cuotas</SelectItem>
                  <SelectItem value="3">3 Cuotas</SelectItem>
                  <SelectItem value="4">4 Cuotas</SelectItem>
                  <SelectItem value="5">5 Cuotas</SelectItem>
                  <SelectItem value="6">6 Cuotas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Label htmlFor="tipo-cuotas">Tipo de cuotas</Label>
              <Select defaultValue="regular" className="w-full">
                <SelectTrigger id="tipo-cuotas" className="w-full">
                  <SelectValue placeholder="Seleccionar tipo de cuotas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="regular">Regular</SelectItem>
                  <SelectItem value="irregular">Irregular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}

