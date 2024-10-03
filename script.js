function searchSolr() {
    const query = document.getElementById('searchQuery').value;
    const solrUrl = `http://localhost:8983/solr/employee_data/select?q=*${query}*&wt=json`;

    fetch(solrUrl)
        .then(response => response.json())
        .then(data => {
            const results = data.response.docs;
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';
            if (results.length > 0) {
                results.forEach(employee => {
                    const employeeDiv = document.createElement('div');
                    employeeDiv.classList.add('employee');
                    employeeDiv.innerHTML = `
                        <p><strong>Employee ID:</strong> ${employee.Employee_ID}</p>
                        <p><strong>Name:</strong> ${employee.Full_Name}</p>
                        <p><strong>Job Title:</strong> ${employee.Job_Title}</p>
                        <p><strong>Department:</strong> ${employee.Department}</p>
                        <p><strong>Business Unit:</strong> ${employee.Business_Unit}</p>
                        <p><strong>Gender:</strong> ${employee.Gender}</p>
                        <p><strong>Ethnicity:</strong> ${employee.Ethnicity}</p>
                        <p><strong>Age:</strong> ${employee.Age}</p>
                        <p><strong>Hire Date:</strong> ${employee.Hire_Date}</p>
                        <p><strong>Annual Salary:</strong> ${employee.Annual_Salary}</p>
                        <p><strong>Bonus %:</strong> ${employee.Bonus_Percentage}</p>
                        <p><strong>Country:</strong> ${employee.Country}</p>
                        <p><strong>City:</strong> ${employee.City}</p>
                        <p><strong>Exit Date:</strong> ${employee.Exit_Date || 'N/A'}</p>
                    `;
                    resultsDiv.appendChild(employeeDiv);
                });
            } else {
                resultsDiv.innerHTML = '<p>No results found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching Solr data:', error);
        });
}
