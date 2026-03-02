import { Header } from "./Header";

function MainLayout({children}:{children:React.ReactNode}){


    return(
       <section className="flex flex-col flex-1 min-h-0">
  <Header />

  <section className="flex-1 min-h-0 overflow-y-auto p-4 md:p-6">
    {children}
  </section>
</section>
    )
}

export default MainLayout;