import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './CharacterClassListCard.css';
import { CLASS_LIST, STRING_CONSTANTS } from '../../consts';
import { Chip, Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const CharacterClassListCard = (props) => {
  const { attributes } = props;
  const [showClassRequirements, setShowClassRequirements] = useState(false)
  const [selectedClass, setSelectedClass] = useState("Barbarian")

  useEffect(() => {
    console.log('attributes changed', attributes)
  }, [attributes])

  const checkClassMinimumPointsRequirements = (ClassAttributeMinimums) => {
    return (Object.keys(attributes).filter(attribute => attributes[attribute] < ClassAttributeMinimums[attribute])).length == 0;
  }

  return (
    <div className='CharacterClassListCard'>

      <h3>{STRING_CONSTANTS.Classes}</h3>

      {Object.keys(CLASS_LIST).map((characterClass, key) => {
        const meetsPointsRequirement = checkClassMinimumPointsRequirements(CLASS_LIST[characterClass])
        return <Chip className='Chip' key={key} color="primary" variant={meetsPointsRequirement ? "filled" : "outlined"} label={characterClass} onClick={()=> {
          setSelectedClass(characterClass);
          setShowClassRequirements(true);
        }} />
      })}

      <Dialog
        open={showClassRequirements}
        onClose={()=> setShowClassRequirements(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {STRING_CONSTANTS.MinClassRequirements.replace("{0}", selectedClass)}
        </DialogTitle>
        <DialogContent>
            {Object.entries(CLASS_LIST[selectedClass]).map((entry, key) => <div key={key} className='MinReqItem'>{entry[0]}: {entry[1]}</div>)}
        </DialogContent>
      </Dialog>
    </div>
  )
}

CharacterClassListCard.propTypes = {
  attributes: PropTypes.object.isRequired
}

export default CharacterClassListCard