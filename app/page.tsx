import { ExampleLink } from "@/components/ExampleLink";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left gap-2">
        <ExampleLink href="/urql" name="urql">
          Saleor Auth example using urql as GraphQL client 
        </ExampleLink>

        <ExampleLink href="/apollo" name="Apollo Client">
          Saleor Auth example using Apollo Client as GraphQL client 
        </ExampleLink>
      </div>
    </>
  )
}
