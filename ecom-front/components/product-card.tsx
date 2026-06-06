import React from 'react'
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Badge } from 'lucide-react'
import { Button } from './ui/button'

interface Props {
    product:{
        id: number;
        name: string;
        description: string;
        price: number;
        image: string;
    }
}

const Productcard = ({product} : Props) => {
    return (
        <Card className="relative mx-auto w-full max-w-sm pt-0 flex flex-col justify-between">
            <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
            <img
                src={product.image}
                alt="Event cover"
                className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
            />
            <CardHeader>
                {/* <CardAction>
                    <Badge variant="secondary">Featured</Badge>
                </CardAction> */}
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>
                    <div>
                        {product.description}
                    </div>
                    <div>
                        price: {product.price} $
                    </div>
                </CardDescription>
            </CardHeader>
            <CardFooter
            // className="self-end"
            >
                <Button className="w-full">Show</Button>
            </CardFooter>
        </Card>
    )
}

export default Productcard