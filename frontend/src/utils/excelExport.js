import * as XLSX from "xlsx";

export function exportStudentsToExcel(students, fileName = "students") {
  if (!students || students.length === 0) {
    alert("No data to export.");
    return;
  }

  const exportData = students.map((s, index) => ({
    "#": index + 1,
    Name: s.name,
    Email: s.email,
    Age: s.age,
    "Created At": s.createdAt
      ? new Date(s.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "—",
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);

  worksheet["!cols"] = [
    { wch: 5 },
    { wch: 25 },
    { wch: 35 },
    { wch: 8 },
    { wch: 20 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

  XLSX.writeFile(workbook, `${fileName}.xlsx`);
}