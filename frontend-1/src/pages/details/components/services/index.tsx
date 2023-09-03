import React from "react";
import { fetchDataFromApi } from "../../../../api"
import "./index.css"

interface service{
    name: string;
    logo: string;
}
interface availableServericesProps {
    rent: service[];
    buy: service[];
}


async function getAvailableServices(mediaType: string, id: string) {
    const response = await fetchDataFromApi(`/${mediaType}/${id}/watch/providers?language=en-US`)
    const BuyServices = response.results.US.buy.map((service: any) => {
        return {
            name: service.provider_name,
            logo: `https://image.tmdb.org/t/p/original${service.logo_path}`
        }
    })
    const RentServices = response.results.US.rent.map((service: any) => {
        return {
            name: service.provider_name,
            logo: `https://image.tmdb.org/t/p/original${service.logo_path}`
        }
    })
    return {
        rent: RentServices,
        buy: BuyServices
    }
}

export default function AvailableServices({mediaType, id} : {mediaType: string, id: string}) {
    const [services, setServices] = React.useState<availableServericesProps>()
    React.useEffect(() => {
        getAvailableServices(mediaType, id).then((services) => {
            setServices(services)
        }
        )
    }, [mediaType, id])

    return (
        <div>
            <div className="availableServices-text">
                <div className="services-text">
                Available at:
                </div>
                {
                    services?.rent.map((service) => {
                        return (
                            <div>
                                <img src={service.logo} alt={service.name} className="serviceLogo" />

                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
