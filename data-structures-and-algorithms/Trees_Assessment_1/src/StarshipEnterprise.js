const Queue = require("./Queue");

class StarshipEnterprise {
  constructor(officerId = null, officerName = null, reportTo = null) {
    this.officerId = officerId;
    this.officerName = officerName;
    this.reportTo = reportTo; // the officer that the new officer reports to
    this.leftReport = null;
    this.rightReport = null;
  }

  assignOfficer(officerId, officerName) {
    if (this.officerId == null) {
      // If tree is empty set it to the root node
      this.officerId = officerId;
      this.officerName = officerName;
    } else if (officerId < this.officerId) {
      if (this.leftReport == null) {
        this.leftReport = new StarshipEnterprise(officerId, officerName, this);
      } else {
        this.leftReport.assignOfficer(officerId, officerName);
      }
    } else {
      if (this.rightReport == null) {
        this.rightReport = new StarshipEnterprise(officerId, officerName, this);
      } else {
        this.rightReport.assignOfficer(officerId, officerName);
      }
    }
  }

  findOfficersWithNoDirectReports(values = []) {
    if (!this.officerId) {
      return values;
    }
    if (!this.leftReport && !this.rightReport) {
      values.push(this.officerName);
    }
    
    if (this.leftReport) {
      values = this.leftReport.findOfficersWithNoDirectReports(values);
    }
    
    if (this.rightReport) {
      values = this.rightReport.findOfficersWithNoDirectReports(values);
    }
    
    return values;
  }

  listOfficersByExperience(officerNames = []) {
    if (this.rightReport) 
      officerNames = this.rightReport.listOfficersByExperience(officerNames);
    
    officerNames.push(this.officerName);
    
    if (this.leftReport) {
      officerNames = this.leftReport.listOfficersByExperience(officerNames);
    }
    
    return officerNames;
  }

  listOfficersByRank(tree, rankedOfficers = {}) {
    const queue = new Queue();
    
    if (!tree.officerId){
      return rankedOfficers;
    }
    
    queue.enqueue({officer: tree, rank : 1});
    let node = queue.dequeue();
    
    while (node) {
      const {officer, rank} = node;
     
      if (rankedOfficers[rank]) {
        rankedOfficers[rank].push(officer.officerName);
      } else {
        rankedOfficers[rank] = [officer.officerName];
      }

      if (officer.leftReport) {
        queue.enqueue({officer: officer.leftReport, rank : rank + 1});
      }
      
      if (officer.rightReport) {
        queue.enqueue({officer: officer.rightReport, rank : rank + 1});
      }
      
      node = queue.dequeue();
    }
    
    return rankedOfficers;
  }
}

module.exports = StarshipEnterprise;
