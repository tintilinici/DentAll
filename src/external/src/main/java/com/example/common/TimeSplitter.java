package com.example.common;

import javafx.util.Pair;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

public class TimeSplitter {

    public static final LocalTime START_TIME = LocalTime.of(8, 0); // 8 AM
    public static final LocalTime END_TIME = LocalTime.of(18, 0); // 6 PM

    public static List<Pair<LocalDateTime, LocalDateTime>> splitFullTimeIntoParts(
            LocalDateTime arrivalDateTime, LocalDateTime departureDateTime, int n) {
        List<Pair<LocalDateTime, LocalDateTime>> parts = new ArrayList<>();

        long totalBusinessMinutes = calculateTotalBusinessMinutes(arrivalDateTime, departureDateTime);
        long minutesPerPart = totalBusinessMinutes / n;

        LocalDateTime currentStart = arrivalDateTime;
        for (int i = 0; i < n; i++) {
            LocalDateTime currentEnd = findEndDateTime(currentStart, minutesPerPart);
            if (currentEnd.isAfter(departureDateTime)) {
                currentEnd = departureDateTime;
            }
            parts.add(new Pair<>(currentStart, currentEnd));
            currentStart = currentEnd.isAfter(departureDateTime) ? departureDateTime : currentEnd;
        }

        return parts;
    }

    private static long calculateTotalBusinessMinutes(LocalDateTime start, LocalDateTime end) {
        long totalMinutes = 0;
        LocalDateTime current = start;
        while (current.toLocalDate().isBefore(end.toLocalDate())) {
            totalMinutes += businessMinutesInDay(current);
            current = current.plusDays(1).with(START_TIME);
        }
        totalMinutes += businessMinutesInDay(current, end);
        return totalMinutes;
    }

    private static long businessMinutesInDay(LocalDateTime dayStart, LocalDateTime dayEnd) {
        LocalTime startTime = dayStart.toLocalTime().isBefore(START_TIME) ? START_TIME : dayStart.toLocalTime();
        LocalTime endTime = dayEnd.toLocalTime().isAfter(END_TIME) ? END_TIME : dayEnd.toLocalTime();
        return Duration.between(startTime, endTime).toMinutes();
    }

    private static long businessMinutesInDay(LocalDateTime day) {
        return businessMinutesInDay(day, day.with(END_TIME));
    }

    private static LocalDateTime findEndDateTime(LocalDateTime start, long minutes) {
        LocalTime timeOfDay = start.toLocalTime();
        if (timeOfDay.isBefore(START_TIME)) {
            start = start.with(START_TIME);
            timeOfDay = START_TIME;
        } else if (timeOfDay.isAfter(END_TIME)) {
            start = start.plusDays(1).with(START_TIME);
            timeOfDay = START_TIME;
        }

        long minutesToEndOfDay = Duration.between(timeOfDay, END_TIME).toMinutes();
        if (minutes <= minutesToEndOfDay) {
            return start.plusMinutes(minutes);
        } else {
            return findEndDateTime(start.plusDays(1).with(START_TIME), minutes - minutesToEndOfDay);
        }
    }

}
