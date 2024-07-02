import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Recipe({data}) {
  const ingredient = data.ingredients.split("|");

  return (
   <>
     <div className="container">
     <Accordion style={{backgroundColor:"#a4c3b2"}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header" > <h3>{data.title} </h3> </AccordionSummary>
        <AccordionDetails><span>Ingredients : </span>
         <ul>
           {ingredient && ingredient.map((item,index)=>{
             return <li key={index}>{item}.</li>
           })}
         </ul>
        
        </AccordionDetails>
        <AccordionDetails><span>Instructions :</span><p>{data.instructions} </p></AccordionDetails>
     
      </Accordion>
     </div>
   </>
  )
}

export default Recipe

