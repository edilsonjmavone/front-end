import { useState, useRef } from 'react'
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';
import { Label } from './components/ui/label';
import { Input } from './components/ui/input';
import { useAuthStatus, useLogin } from './hooks/useAuth';
import { Loader2Icon } from "lucide-react"
import { useNavigate } from 'react-router';

function App() {
  const navigate = useNavigate()
  const {loggedIn, checking} = useAuthStatus()
  if (!checking){
    if (loggedIn) navigate("/")
  }
  const [formData, setFormData] = useState<{ email: string, pwd: string }>({ email: "", pwd: "" })
  const formRef = useRef<HTMLFormElement>(null)
  const { submitForm, loading, error } = useLogin()


  async function submitFormHandler() {
    console.log(formData);
    submitForm(formData)
  }

  return (
    <div className='mt-[7rem] m-auto w-dvw min-h-[20rem]  flex justify-center' style={{ color: 'red' }}>

      <Card className='m-[4rem] w-[20rem] flex justify-center bg-background border-0'>
        <CardHeader className='text-center'>
          <CardTitle className='scroll-m-20 text-2xl font-semibold tracking-tight'>
            Login
          </CardTitle>
          <CardDescription>
            {error.err ? <span className='text-red-500'>{error.reason}</span> : "Insira as suas credencias"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            ref={formRef}
            onSubmit={(e) => { e.preventDefault(); submitFormHandler() }}
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
                type='text'
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
          <Button variant={'default'} disabled={loading} onClick={() => formRef.current?.requestSubmit()} className='w-full' > {loading ? <Loader2Icon className='animate-spin' /> : ""} Entrar</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default App
