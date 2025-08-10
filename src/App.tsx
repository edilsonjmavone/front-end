import { useState, useRef } from 'react'
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';
import { Label } from './components/ui/label';
import { Input } from './components/ui/input';
import { useNavigate } from "react-router"

function App() {
  const [formData, setFormData] = useState<{ email: string, pwd: string }>({ email: "", pwd: "" })
  const formRef = useRef<HTMLFormElement>(null)
  const navigate = useNavigate()
  async function submitForm() {
    // console.log(formData);
    await fetch("http://localhost:3000/login", {
      headers: {
        'Content-Type': 'application/json'
      },
      mode: "cors",
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        email: formData.email,
        pwd: formData.pwd
      })
    }).then(res => {
      if (!res.ok) throw new Error("Not logged in");
      navigate("/") // navegar para a pagina  principal
    })
  }
  return (
    <div className='mt-[7rem] m-auto w-dvw min-h-[20rem]  flex justify-center' style={{color:'red'}}>

      <Card className='m-[4rem] w-[20rem] flex justify-center bg-background border-0'>
        <CardHeader className='text-center'>
          <CardTitle className='scroll-m-20 text-2xl font-semibold tracking-tight'>
            Login
          </CardTitle>
          <CardDescription>
            Insira as suas credencias
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            ref={formRef}
            onSubmit={(e) => { e.preventDefault(); submitForm() }}
          >
            <div className='mt-3'>
              <Label>O seu endereco de email</Label>
              <Input
                required
                type='email'
                placeholder='Email'
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                value={formData.email}
                className='mt-2'></Input>
            </div>
            <div className='mt-4'>
              <Label>A sua password</Label>
              <Input
                required
                min={7}
                type='password'
                placeholder='Palavra-passe'
                onChange={(e) =>
                  setFormData({ ...formData, pwd: e.target.value })
                }
                value={formData.pwd}
                className='mt-2'></Input>
            </div>
          </form>
        </CardContent>
        <CardFooter className='mt-3'>
          <Button variant={'default'} onClick={() => formRef.current?.requestSubmit()} className='w-full' >Entrar</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default App
