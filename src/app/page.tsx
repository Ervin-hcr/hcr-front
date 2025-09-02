import Home from "../../components/Home";
import Nav from "../../components/Nav"
import Business from "../../components/Business"
import Services from "../../components/Skills"
import Slider from "../../components/Slider"
import Gallery from "../../components/Gallery"
import InterventionMap from "../../components/InterventionMaps"
import ContactForm from "../../components/ContactForm"

export default function Page() {

  return <>
  <Nav></Nav>
  <Home />
  <Business></Business>
  <Services></Services>
  <Slider></Slider>
  <Gallery></Gallery>
  <InterventionMap></InterventionMap>
  <ContactForm></ContactForm>
  </>
}
