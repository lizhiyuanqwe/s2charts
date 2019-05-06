package com.s2charts.tool.servlet;


import com.alibaba.fastjson.JSONObject;
import com.s2charts.tool.http.Parameters;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * d3 编辑，放置jsp文件直接暴露
 *
 * <p style="color:#ff0000;">
 *     注意：转发时应该用include而不用forward，
 *     应为有的tomcat使用forward服务解析jsp
 * </>
 *
 *
 * Created by Linhao on 2015/12/8.
 */
@WebServlet(name = "d3EditServlet",urlPatterns = "/http/editd3")
public class D3EditServlet extends AbstractSuperMapServlet {


    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        request.getRequestDispatcher("/http/chart.d3.edit.jsp").include(request, response);
    }


    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        request.getRequestDispatcher("/http/chart.d3.edit.jsp").include(request, response);
    }

    @Deprecated
    @Override
    protected JSONObject action(HttpServletRequest request, HttpServletResponse response,
                                Parameters parameters, String action) {
        return null;
    }
}
