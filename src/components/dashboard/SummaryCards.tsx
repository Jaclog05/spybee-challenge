type Props = {
  totalActivas: number
  abiertas: number
  cerradas: number
  pausadas: number
  vencidas: number
}

export default function SummaryCards({ totalActivas, abiertas, cerradas, pausadas, vencidas }: Props) {
  return (
    <section aria-label="Resumen General">
      <h3>Resumen General</h3>
      <div>
        <p>Activas: {totalActivas}</p>
        <p>Abiertas: {abiertas}</p>
        <p>Cerradas: {cerradas}</p>
        <p>Pausadas: {pausadas}</p>
        <p>Vencidas: {vencidas}</p>
      </div>
    </section>
  )
}