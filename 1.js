const parser = new DOMParser();

const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

const xmlDOM = parser.parseFromString(xmlString, 'text/xml');

const listNode = xmlDOM.querySelector("list");
const studentsNode = xmlDOM.querySelectorAll("student");

const studentsList = [];
studentsNode.forEach(
everyStudent => {
  const nameNode = everyStudent.querySelector("name");
  const firstNameNode = everyStudent.querySelector("first");
  const secondNameNode = everyStudent.querySelector("second");
  const ageNode = everyStudent.querySelector("age");
  const profNode = everyStudent.querySelector("prof");
  const langAttr = nameNode.getAttribute('lang');
  
  studentsList.push({
    name: firstNameNode.textContent + " " + secondNameNode.textContent,
    age: ageNode.textContent,
    prof: profNode.textContent,
    lang: langAttr,
  });
});

const result = {
  studentsList: studentsList
};

console.log('result', result);

