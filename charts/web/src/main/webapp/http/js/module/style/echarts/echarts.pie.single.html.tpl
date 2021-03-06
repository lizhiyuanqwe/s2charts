<h4 style="font-family:微软雅黑;">
	<small>
		可以调整参数后动态改变可视化图样式
	</small>
</h4>
<ul class="nav nav-list bs-docs-sidenav pull-left">
  <li class="active"><a href="#panel-common" data-toggle="tab">通用</a></li>

</ul>		
<div class="tab-content bs-docs-sidenav-content pull-left" style="height:500px;width:100px;overflow:scroll">
  <div class="tab-pane active" id="panel-common">
    <div class="panel panel-default">
    	<div class="panel-body">
	  		<div class="input-group">
		    	<span class="input-group-addon" style="width:auto;">
		        	图高度
		      	</span>
		       	<span class="input-group-addon" style="width:auto;">
		       		<input id="chart-chart-height-range" type="range" value="200" min="100" max="400">
		       	</span>
		      	<input id="chart-chart-height-text" type="text" class="form-control"  disabled="disabled" value="200" style="width:60px;" >
		       	<span class="input-group-addon" style="width:auto;">
		       		px
		       	</span>
		    </div><!-- /input-group -->
    	</div>
    </div>
	  <div class="panel panel-default">
		  <div class="panel-heading">
			  背景颜色样式
		  </div>
		  <div class="panel-body">
			  <div class="input-group pull-left" >
                <span class="input-group-addon" style="width:auto;">
                    背景颜色
                </span>
				  <input id="chart-backgroundColor-select" type="color" class="form-control" style="width:45px;" value="#2c343c" />
			  </div><!-- /input-group -->
			  <div class="clearfix"></div>
		  </div>
	  </div>
    <div class="panel panel-default">
    	<div class="panel-heading">
    		圆饼半径
    	</div>
    	<div class="panel-body">
    		<div class="input-group">
		    	<span class="input-group-addon" style="width:auto;">
		        	圆饼半径(内)
		      	</span>
		      	<span class="input-group-addon" style="width:auto;">
		       		<input id="chart-pie-r-inner-range" type="range" value="25" max="100" min="0">
		       	</span>
		      	<input id="chart-pie-r-inner-text" type="text" class="form-control" disabled="disabled" style="width:45px;" value="25">
		      	<span class="input-group-addon" style="width:auto;">
		        	%
		      	</span>
		    </div><!-- /input-group -->
    	</div>
    	<div class="panel-body">
    		<div class="input-group">
		    	<span class="input-group-addon" style="width:auto;">
		        	圆饼半径(外)
		      	</span>
		      	<span class="input-group-addon" style="width:auto;">
		       		<input id="chart-pie-r-outter-range" type="range" value="50" max="100" min="0">
		       	</span>
		      	<input id="chart-pie-r-outter-text" type="text" class="form-control" disabled="disabled" style="width:45px;" value="50">
		      	<span class="input-group-addon" style="width:auto;">
		        	%
		      	</span>
		    </div><!-- /input-group -->
    	</div>
    </div>
    <div class="panel panel-default">
    	<div class="panel-heading">
    		饼系列颜色样式
    	</div>
    	<div class="panel-body">
    		<div class="input-group pull-left">
		    	<span class="input-group-addon" style="width:auto;">
		        	饼系列颜色
		      	</span>
		    </div>
			<br/>
		    <div class="input-group pull-left" style="margin-left:20px;margin-top: 10px;">
		    	<span id="chart-pie-color-container" data-index="1">
		      	</span>
		    </div>
		    <div class="clearfix"></div>
    	</div>
    </div>
    <div class="panel panel-default">
    	<div class="panel-heading">
    		图例样式
    	</div>
    	<div class="panel-body">
    		<div class="input-group">
		    	<span class="input-group-addon" style="width:auto;">
		        	<input id="chart-show-legend-check" type="checkbox" checked="checked">
		        	是否显示图例
		      	</span>
		    </div><!-- /input-group -->
			<br/>
<!--//于-->
			<div class="input-group  pull-left" >
                <span class="input-group-addon" style="width:auto;">
                    图例字体颜色
                </span>
				<input id="chart-legend-color-select" type="color" class="form-control" style="width:45px;" value="#000000" />
			</div><!-- /input-group -->
			<div class="clearfix"></div>
			<br/>
			<div class="input-group">
                <span class="input-group-addon" style="width:auto;">
                    图例位置
                </span>
				<span class="input-group-addon" style="width:auto;">
                    <input id="chart-font-position-radio-1" name="legend-position-radio" type="radio"  value="left" />
                    <label for="chart-font-position-radio-1">左</label>
                </span>
				<span class="input-group-addon" style="width:auto;">
                    <input id="chart-font-position-radio-2" name="legend-position-radio" type="radio"  value="center" checked="checked" />
                    <label for="chart-font-position-radio-2">中</label>
                </span>
				<span class="input-group-addon" style="width:auto;">
                    <input id="chart-font-position-radio-3" name="legend-position-radio" type="radio"  value="right" />
                    <label for="chart-font-position-radio-3">右</label>
                </span>
			</div>
    	</div>
    </div>
    <div class="panel panel-default">
    	<div class="panel-heading">
    		文字样式
    	</div>
    	<div class="panel-body">
    		<div class="input-group">
		    	<span class="input-group-addon" style="width:auto;">
		        	<input id="chart-show-label-check" type="checkbox" checked="checked">
		        	是否显示文字
		      	</span>
		    </div><!-- /input-group -->
		    <br/>
			<div class="input-group">
		    	<span class="input-group-addon" style="width:auto;">
		        	字体大小
		      	</span>
				<span class="input-group-addon" style="width:auto;">
		       		<input id="chart-font-size-range" type="range" value="12"  max="40" min="9">
		       	</span>
				<input id="chart-font-size-text" type="text" class="form-control" disabled="disabled" style="width:45px;" value="12" />
				<span class="input-group-addon" style="width:auto;">
		        	px
		      	</span>
				<!--//标签字体颜色-->
				<span class="input-group-addon" style="width:auto;">
                字体颜色
                </span>
				<input id="chart-textColor-select" type="color" class="form-control" style="width:45px;" value="#ffffff" />

			</div><!-- /input-group -->
    		<br/>
		    <div class="input-group">
		    	<span class="input-group-addon" style="width:auto;">
		        	字体位置
		      	</span>
		      	<span class="input-group-addon" style="width:auto;">
		        	<input id="chart-font-position-radio-1" name="chart-font-position-radio" type="radio"  value="top" checked="checked" />
		        	<label for="chart-font-position-radio-1">外</label>
		      	</span>
		      	<span class="input-group-addon" style="width:auto;">
		        	<input id="chart-font-position-radio-2" name="chart-font-position-radio" type="radio"  value="inside" />
		        	<label for="chart-font-position-radio-2">内</label>
		      	</span>
		      	<!--<span class="input-group-addon" style="width:auto;">-->
		        	<!--<input id="chart-font-position-radio-3" name="chart-font-position-radio" type="radio"  value="insideLeft" />-->
		        	<!--<label for="chart-font-position-radio-3">内左</label>-->
		      	<!--</span>-->
		      	<!--<span class="input-group-addon" style="width:auto;">-->
		        	<!--<input id="chart-font-position-radio-4" name="chart-font-position-radio" type="radio"  value="insideRight" />-->
		        	<!--<label for="chart-font-position-radio-4">内右</label>-->
		      	<!--</span>-->
		    </div><!-- /input-group -->
<br/>
			<div class="input-group">
                    <span class="input-group-addon" style="width:auto;">
                        字体风格
                    </span>
				<span class="input-group-addon" style="width:auto;">
                        <input id="chart-font-style-radio-1" name="chart-font-style" type="radio"  value="normal" checked="checked" />
                        <label for="chart-font-style-radio-1">normal</label>
                    </span>
				<span class="input-group-addon" style="width:auto;">
                        <input id="chart-font-style-radio-2" name="chart-font-style" type="radio"  value="italic" />
                        <label for="chart-font-style-radio-2">italic</label>
                    </span>
				<span class="input-group-addon" style="width:auto;">
                        <input id="chart-font-style-radio-3" name="chart-font-style" type="radio"  value="oblique" />
                        <label for="chart-font-style-radio-3">oblique</label>
                    </span>

			</div><!-- /input-group -->


    	</div>
    </div>
  </div>
</div>
<div class="clearfix"></div>