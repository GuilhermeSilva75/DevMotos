export interface MotosProps {
  id: string
  name: string
  year: string
  km: string
  city: string
  price: string | number
  uid: string
  images: string
}

export interface MotoDetailProps{
  id: string
  name: string
  year: string
  km: string
  city: string
  price: string | number,
  owner: string
  created: string
  descripition: string
  uid: string
  whatsapp: string
  images: string
  model: string
}