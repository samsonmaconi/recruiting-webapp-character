import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './CharacterCard.css';
import AttributesCard from '../AttributesCard/AttributesCard';
import CharacterClassListCard from '../CharacterClassListCard/CharacterClassListCard';
import { ATTRIBUTE_LIST, DEFAULT_ATTRIBUTE_VALUE, DEFAULT_SKILL_VALUE, SKILL_LIST } from '../../consts';
import { useDispatch, useSelector } from 'react-redux';
import { updateCharacterAttributes, updateCharacterSkills } from '../../redux/slices/characterCardsSlice';
import SkillsCard from '../SkillsCard/SkillsCard';

const CharacterCard = props => {
  const characterAttributes = useSelector(state => state.characterCards.characterAttributes);
  const characterSkills = useSelector(state => state.characterCards.characterSkills);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!characterAttributes) {
      initState();
    }
  }, [])

  const initState = () => {
    const initAttributes = {}
    ATTRIBUTE_LIST.forEach(attribute => initAttributes[attribute] = DEFAULT_ATTRIBUTE_VALUE);
    dispatch(updateCharacterAttributes(initAttributes));
    
    const initSkills = {}
    SKILL_LIST.forEach(skill => initSkills[skill.name] = {...skill, value: DEFAULT_SKILL_VALUE});
    dispatch(updateCharacterSkills(initSkills));
  }

  return (
    <div className="CharacterCard">
      {characterAttributes && <>
        <AttributesCard attributes={characterAttributes} />
        <CharacterClassListCard attributes={characterAttributes} />
        <SkillsCard attributes={characterAttributes} skills={characterSkills} />
      </>}
    </div>
  )
}

CharacterCard.propTypes = {}

export default CharacterCard