SELECT SUM(amount)
FROM grants
WHERE EXTRACT(YEAR FROM fiscal_year) = 2008
AND LOWER(applicant_name) LIKE '%women%';