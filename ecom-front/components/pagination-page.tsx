import React from 'react'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination'

const PaginationPage = ({ paginations, onPageChange }: { paginations: any; onPageChange: (page: number) => void }) => {
    
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious 
                    href="#" 
                    onClick={(e) => {
                        e.preventDefault();
                        if(paginations?.links[0]?.url){
                            onPageChange(paginations.links[0].page);
                        }
                    }}
                    />
                </PaginationItem>
                {paginations?.links.map((link: any, index: number) => {
                    if (
                        link.label.includes("Previous") ||
                        link.label.includes("Next")
                    ) {
                        return null;
                    }

                    if (link.label === "...") {
                        return (
                            <PaginationItem key={index}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        );
                    }
                    return (
                        <PaginationItem key={index}>
                            <PaginationLink 
                            href={"#"}
                            onClick={(e) =>{
                                e.preventDefault();
                                onPageChange(link.page)
                            }}
                             isActive={link.active}>
                                {link.label}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}
                <PaginationItem>
                    <PaginationNext 
                    href="#" 
                    onClick={(e) => {
                        e.preventDefault();
                        if(paginations?.links[paginations?.links?.length - 1]?.url){
                            onPageChange(paginations.links[paginations.links.length - 1].page);
                        }
                    }}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationPage