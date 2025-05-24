import { RestaurantList } from '@/templates/restaurant/restaurant-list'
import Image from 'next/image'

type PageProps = {
  searchParams: Promise<{ q?: string }>
}

export default async function Home(props: Readonly<PageProps>) {
  const searchParams = await props.searchParams
  const query = searchParams.q ?? ''

  return (
    <div className="lg:mt-4 mb-6">
      <div className="relative h-[130px] md:h-[230px] lg-[330px] w-full lg:max-w-[960px] lg:mx-auto">
        <Image
          src="/assets/banner.png"
          alt="Banner promocional colorido com tema infantil e visual retrô. À esquerda, um boneco de ação com cabeça de mulher segura um hambúrguer; à direita, outro boneco com cabeça de homem segura um donut com confeitos. No centro, o texto: “Rango barato no Dia das Crianças! Peça com até 50% OFF”. Abaixo, notas em letras pequenas: “*imagem ilustrativa” e “*promoção por tempo limitado”."
          fill
          priority
          className="bg-gray-300 object-cover"
        />
      </div>

      <div className="flex flex-col gap-4 mt-6 px-4">
        <p className="text-xl font-extrabold text-brand">abertos</p>

        <RestaurantList query={query} />
      </div>

      <div className="flex flex-col gap-4 mt-6 px-4">
        <p className="text-xl font-extrabold text-brand">fechados</p>

        <RestaurantList query={query} closedRestaurants />
      </div>
    </div>
  )
}
