'use client'

import { toast } from '@/hooks/use-toast'

export function useShareRestaurant() {
  return (restaurantName: string) => {
    if (typeof window === 'undefined') return

    const url = window.location.href

    if (navigator.share) {
      navigator
        .share({
          title: restaurantName,
          text: `Confira o restaurante "${restaurantName}" no aiqfome!`,
          url
        })
        .catch((err) => {
          console.error('Erro ao compartilhar:', err)
        })
    } else {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          toast({
            title: 'Link copiado!',
            description:
              'A URL do restaurante foi copiada para a área de transferência.',
            duration: 3000
          })
        })
        .catch((err) => {
          console.error('Erro ao copiar URL:', err)
        })
    }
  }
}
