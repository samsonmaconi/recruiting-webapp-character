import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './SkillsCard.css';
import { ABILITY_MODIFIER_POINTS_BASE, ABILITY_MODIFIER_POINTS_COUNT, STRING_CONSTANTS, TOTAL_SKILL_POINTS_BASE } from '../../consts';
import PointsInputControl, { PointsInputControlType } from '../PointsInputControl/PointsInputControl';
import { useDispatch } from 'react-redux';
import { updateCharacterSkills } from '../../redux/slices/characterCardsSlice';

const SkillsCard = props => {
  const { attributes, skills } = props;
  const dispatch = useDispatch();
  const [totalSkillPointsAvailable, setTotalSkillPointsAvailable] = useState(TOTAL_SKILL_POINTS_BASE);
  const [totalSkillPointsAllotted, setTotalSkillPointsAllotted] = useState(0);

  useEffect(() => {
    const _totalSkillPointsAvailable = (TOTAL_SKILL_POINTS_BASE + (getAttributeModifierValue("Intelligence") * 4)) - totalSkillPointsAllotted
    setTotalSkillPointsAvailable(_totalSkillPointsAvailable)
  }, [attributes])

  useEffect(() => {
    let _totalSkillPointsAllotted = 0;
    Object.keys(skills).forEach((skill) => _totalSkillPointsAllotted += skills[skill].value);
    setTotalSkillPointsAllotted(_totalSkillPointsAllotted);
  }, [])


  const handlePointChange = (skill, value) => {
    const newSkillValueEntry = { ...skills[skill], value }
    dispatch(updateCharacterSkills({ ...skills, [skill]: newSkillValueEntry }))
  }

  const handleAddPoint = () => {
    setTotalSkillPointsAvailable(totalSkillPointsAvailable - 1)
    setTotalSkillPointsAllotted(totalSkillPointsAllotted + 1)
  }

  const handleRemovePoint = () => {
    setTotalSkillPointsAvailable(totalSkillPointsAvailable + 1)
    setTotalSkillPointsAllotted(totalSkillPointsAllotted - 1)
  }

  const getAttributeModifierValue = (attributeModifier) => {
    return Math.floor((attributes[attributeModifier] - ABILITY_MODIFIER_POINTS_BASE) / ABILITY_MODIFIER_POINTS_COUNT) || 0
  }

  return (
    <div className="SkillsCard">
      <div className='header'>
        <h3>{STRING_CONSTANTS.Skills}</h3>
        <span>{STRING_CONSTANTS.TotalSkillPointsAvailable}: {totalSkillPointsAvailable}</span>
      </div>
      {Object.keys(skills).map((skill, key) => {
        const { name, attributeModifier, value } = skills[skill];
        const modifierValue = getAttributeModifierValue(attributeModifier);
        return <PointsInputControl
          key={key}
          name={name}
          value={value}
          minValue={modifierValue}
          maxValue={totalSkillPointsAvailable + value + modifierValue}
          modifierValue={modifierValue}
          type={PointsInputControlType.Skill}
          onChange={(val) => handlePointChange(name, val)}
          onIncrease={() => handleAddPoint()}
          onDecrease={() => handleRemovePoint()}
        />
      })}
    </div>
  )
}

SkillsCard.propTypes = {
  attributes: PropTypes.object.isRequired,
  skills: PropTypes.object.isRequired
}

export default SkillsCard