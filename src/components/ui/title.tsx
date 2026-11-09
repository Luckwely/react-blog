type Props = {
  children: any;
}

export default function Title({children}:Props) {
  return (
    <h1 className="text-3xl font-bold">{children}</h1>
  )
}
