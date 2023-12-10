import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Calendar } from 'src/calendar/schemas/calendar.schema';

// Função auxiliar para validar a existência do dia


export function registerDayValidation(daySelected: Calendar, day: string, funciId: string) {

  if (!daySelected) {
    throw new NotFoundException('Day not found.');
  }

  const selectedDayObject = daySelected.days.find(
    (dayObj) => dayObj.day === day
  );
  if (!selectedDayObject) {
    throw new NotFoundException('Day not found in array.');
  }

  if (selectedDayObject.listFunci.includes(funciId)) {
    throw new BadRequestException('funciId already exists in listFunci.');
  }
  if (selectedDayObject.listFunci.length >= 5) {
    throw new BadRequestException('Exceeded maximum limit of listFunci.');
  }
  return selectedDayObject;
}




export function removeDayValidation(daySelected: Calendar, day: string, funciId: string){

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




// export function validateDay(daySelected: Calendar, day: string) {
//   if (!daySelected) {
//     throw new NotFoundException('Day not found.');
//   }

//   const selectedDayObject = daySelected.days.find(
//     (dayObj) => dayObj.day === day
//   );

//   if (!selectedDayObject) {
//     throw new NotFoundException('Day not found in array.');
//   }
  
//   return selectedDayObject;
// }

// // Função auxiliar para validar a duplicidade do funciId
// export function validateDuplicateFunciId(
//   selectedDayObject: any,
//   funciId: string
// ) {
//   if (selectedDayObject.listFunci.includes(funciId)) {
//     throw new BadRequestException('funciId already exists in listFunci.');
//   }
// }

// export function validateListFunciLength(listFunci: string[], amount: number) {
//   if (listFunci.length >= 5) {
//     throw new BadRequestException('Exceeded maximum limit of listFunci.');
//   }
// }
