import React from 'react'
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Badge } from 'lucide-react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

interface Props {
    product: {
        id: number;
        name: string;
        description: string;
        price: number;
        image: string;
        slug: string;
    }
}

const Productcard = ({ product }: Props) => {
    const router = useRouter();
    
    return (
        <Card className="relative mx-auto w-full max-w-sm pt-0 flex flex-col justify-between">
            <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
            <img
                src={product.image}
                alt="Event cover"
                className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
            />
            <CardHeader>

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
            >
                <Button className="w-full cursor-pointer"
                onClick={() => router.push(`/product/${product.slug}`)}
                >Show</Button>
            </CardFooter>
        </Card>
    )
}

export default Productcard