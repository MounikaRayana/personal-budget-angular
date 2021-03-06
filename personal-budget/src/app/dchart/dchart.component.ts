import { Component, AfterViewInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as d3 from 'd3';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-dchart',
  templateUrl: './dchart.component.html',
  styleUrls: ['./dchart.component.scss']
})
export class DchartComponent implements AfterViewInit {

  public data = [];
  private svg;
  private margin = 50;
  private width = 750;
  private height = 600;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;

  constructor(private http: HttpClient , private dataService: DataService) { }

  ngAfterViewInit(): void {

    this.dataService.dataImport().subscribe(value => {
      console.log(value);
      this.data = value;
      this.createSvg();
      this.createColors();
      this.drawChart();
    })

    // this.http.get('http://localhost:3000/budget')
    // .subscribe((res: any) => {
    //   console.log(res);
    //   this.data = res;
    //   this.createSvg();
    //   this.createColors();
    //   this.drawChart();
    // });
  }


  private createSvg(): void {
    this.svg = d3.select("figure#pie")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    );
}

private createColors(): void {
  this.colors = d3.scaleOrdinal()
  .domain(this.data.map(d => d.budget))
  .range(['#ffcd56',
  '#ff6384',
  '#36a2eb',
  '#fd6b19',
  '#878BB6',
  '#4ACAB4',
  '#FF8153']);
}


private drawChart(): void {
  // Compute the position of each group on the pie:
  const pie = d3.pie<any>().value((d: any) => Number(d.budget));

  // Build the pie chart
  this.svg
  .selectAll('pieces')
  .data(pie(this.data))
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(110)
    .outerRadius(this.radius)
  )
  .attr('fill', (d, i) => (this.colors(i)))
  .attr('stroke', '#121926')
  .style('stroke-width', '1px');

  // Add labels
  const labelLocation = d3.arc()
  .innerRadius(100)
  .outerRadius(this.radius);

  this.svg
  .selectAll('pieces')
  .data(pie(this.data))
  .enter()
  .append('text')
  .text(d => d.data.title)
  .attr('transform', d => 'translate(' + labelLocation.centroid(d) + ')')
  .style('text-anchor', 'middle')
  .style('font-size', 15);
}

}
