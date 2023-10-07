import Posts from "./components/Posts";

//*this is a route config.
//? the ISR for revalidate is apply only on page or layout pages.
//? for dynamicParams no need to apply this because it is already applied. there is "export const revalidate = true"

//* but the revalidate made in fetch will override this one

export const revalidate = 10 // it can 86400 for a day


export default function Home() {
  return (
    <main className="px-6 mx-auto">
       <Posts/>
    </main>
  );
}
