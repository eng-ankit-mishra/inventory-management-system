import Navbar from "../components/Navbar.jsx";

export default function Dashboard() {

    const productDetails=[{
        id:1,
        title: 'Total Products',
        description:'150',
        color:"red"
    },
        {
            id:1,
            title: 'Total Value',
            description:'5,00,000',
            color:"blue"
        },{
            id:1,
            title: 'Low Stock',
            description:'5',
            color:"green"
        }]

    const productDetailsCard=productDetails.map((item)=>{
        return (
            <div key={item.id} className={`dashboard-card card-${item.color}`}>
                <h3 className={"product-card-heading"}>{item.title}</h3>
                <p className={"product-card-desc"}>{item.description}</p>
            </div>
        )
    })
    return(
        <section className={"dashboard"}>
            <Navbar/>
            <h2>Dashboard</h2>
            <main className={"dashboard-main"}>
                {productDetailsCard}
            </main>
        </section>
    )
}