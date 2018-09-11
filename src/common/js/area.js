export class SearchData {
  constructor ({areaType, areaid, areaname, parentid, projectid, list}) {
    this.type = areaType
    this.areaId = areaid
    this.name = areaname
    this.parentId = parentid
    this.projectId = projectid
    this.alarmState = list && list.length > 0
  }
}
