interface CalendarData {
    monthIntRef: number;
    month: string;
    days: { day: string; listFunci: any[]; weekday: string }[];
}
export function generateCalendar(month: number, year: number): CalendarData {
    const calendar: CalendarData = {
        monthIntRef: month,
        month: '',
        days: []
    };

    // Array de nomes dos meses em português
    const monthNames = [
        'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
        'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];

    // Array de nomes dos dias da semana em português
    const dayOfWeekNames = [
        'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'
    ];

    // Cria um objeto de data para o primeiro dia do mês
    const startDate = new Date(year, month - 1, 1);

    // Adiciona o nome do mês ao objeto de calendário
    calendar.month = monthNames[startDate.getMonth()];

    // Obtém o último dia do mês
    const lastDay = new Date(year, month, 0).getDate();

    // Loop através de cada dia do mês
    for (let day = 1; day <= lastDay; day++) {
        // Cria um novo objeto de data para o dia atual
        const currentDate = new Date(year, month - 1, day);

        // Verifica se o dia é sábado (6) ou domingo (0)
        if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
            continue; // Ignora fins de semana
        }

        // Formata a data como "YYYY-MM-DD"
        const formattedDate = currentDate.toISOString().split('T')[0];

        // Obtém o nome do dia da semana
        const weekday = dayOfWeekNames[currentDate.getDay()];

        // Inicializa o array para o dia atual
        const dayDetails = { day: formattedDate, listFunci: [], weekday: weekday };

        // Adiciona os detalhes do dia ao calendário
        calendar.days.push(dayDetails);
    }

    return calendar;
}

// Exemplo de uso
const result = generateCalendar(12, 2023);
console.log(result);
