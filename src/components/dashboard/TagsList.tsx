type Props = { tags: [string, number][] }

export default function TagsList({ tags }: Props) {
  return (
    <div>
      <h4>Por etiqueta</h4>
      <ul>
        {tags.map(([name, count]) => (
          <li key={name}>{name} — {count}</li>
        ))}
      </ul>
    </div>
  )
}