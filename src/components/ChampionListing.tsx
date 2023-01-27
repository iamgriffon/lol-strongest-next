import Image from 'next/image'

interface ChampionListingProps {
  data: {
    index: Number
    icon: string
    name: string
    title: string
  } | undefined,
  vote: () => void
}

export function ChampionListing({ data, vote }: ChampionListingProps) {

  const buttonClasses = "justify-center items-center px-4 py-1.5 my-4 border-gray-200 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"

  const voteForStrongest = (selected?: Number) => {
    console.log(selected)
  }

  return (
    <div className="flex flex-col items-center align-center">
      <div className="mr-2 flex flex-col bg-red-800">
        {data && <Image src={data?.icon} width={128} height={128}  alt={data?.name} />}
      </div>
      <span className="mt-2.5 max-w-2xl">{`${data?.name}, ${data?.title}`}</span>
      <button
        className={buttonClasses}
        onClick={() => voteForStrongest(data?.index)}>Strongest</button>
    </div>
  )

}