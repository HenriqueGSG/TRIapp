import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Calendar } from 'src/calendar/schemas/calendar.schema';



export function registerDayValidation(daySelected: Calendar, day: string, funciId: string) {
  const dayLimit = 3

  if (!daySelected) {
    throw new NotFoundException('Day not found.');
  }

  const selectedDayObject = daySelected.days.find(
    (dayObj) => dayObj.day === day
  );
  if (!selectedDayObject) {
    throw new NotFoundException('Day not found in array.');
  }

  if (selectedDayObject.listFunci.length >= dayLimit) {
    throw new BadRequestException(`Exceeded maximum limit of listFunci. (${dayLimit})`);
  }
  if (selectedDayObject.listFunci.includes(funciId)) {
    throw new BadRequestException('funciId already exists in listFunci.');
  }
  return selectedDayObject;
}




export function removeDayValidation(daySelected: Calendar, day: string, funciId: string) {

  if (!daySelected) {
    throw new NotFoundException('Day not found.');
  }

  const selectedDayObject = daySelected.days.find(
    (dayObj) => dayObj.day === day
  );

  if (!selectedDayObject) {
    throw new NotFoundException('Day not found in array.');
  }
  if (!selectedDayObject.listFunci.includes(funciId)) {
    throw new NotFoundException('Funci is not registered on this day.');
  }

  return selectedDayObject;
}

