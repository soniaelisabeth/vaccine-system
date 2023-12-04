import { Typography } from "@mui/material"

interface PageTitleProps {
  title: string
}

export default function PageTitle({ title }: PageTitleProps) {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '5px', padding: '5px'}}>
      <Typography color="text.primary" variant="h5" style={{ display: 'inline-block' }}>
        {title}
      </Typography>
  </div>
  )
}
