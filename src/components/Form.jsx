import { useState, useEffect } from 'react'
import Error from './Error'

const Form = ({ patients, setPatients, patient, setPatient }) => {

  const [nombre, setNombre] = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [alta, setAlta] = useState('')
  const [sintomas, setSintomas] = useState('')

  const [error, setError] = useState(false)

  useEffect(() => {
    if (Object.keys(patient).length > 0) {
      setNombre(patient.nombre)
      setPropietario(patient.propietario)
      setEmail(patient.email)
      setAlta(patient.alta)
      setSintomas(patient.sintomas)
    }
  }, [patient])

  const generarId = () => {
    const random = Math.random().toString(36).slice(2)
    const fecha = Date.now().toString(36)
    return random + fecha
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validar formulario
    if ([nombre, propietario, email, alta, sintomas].includes('')) {
      console.log('Todos los campos son obligatorios')
      setError(true)
      return
    }

    setError(false)

    // Crear objeto
    const newPatient = {
      nombre,
      propietario,
      email,
      alta,
      sintomas
    }

    if (patient.id) {
      // Editar paciente
      newPatient.id = patient.id

      const patientsUpdated = patients.map( patientState => patientState.id === patient.id ? newPatient : patientState )

      setPatients(patientsUpdated)
      setPatient({})

    } else {
      newPatient.id = generarId()
      setPatients([...patients, newPatient])
    }

    // Reiniciar formulario
    setNombre('')
    setPropietario('')
    setEmail('')
    setAlta('')
    setSintomas('')
    
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mb-3">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade pacientes y {' '}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5"
      >

        {error && <Error><p>Todos los campos son obligatorios</p></Error>}

        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold"> Nombre Mascota</label>
          <input
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="text"
            placeholder="Nombre de la mascota"
            id="mascota"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold"> Nombre Propietario</label>
          <input
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="text"
            placeholder="Nombre del propietario"
            id="propietario"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold"> Email</label>
          <input
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="email"
            placeholder="Email del propietario"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold"> Alta</label>
          <input
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="date"
            id="alta"
            value={alta}
            onChange={(e) => setAlta(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold"> Síntomas</label>
          <textarea
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            id="sintomas"
            placeholder="Describe los síntomas"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 rounded-md cursor-pointer transition-colors duration-500"
          value={ patient.id ? 'Editar paciente' : 'Agregar paciente'}
        />
      </form>
    </div>
  )
}

export default Form