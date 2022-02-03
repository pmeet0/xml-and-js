<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">   
    <xsl:template match="/"> 
        <html> 
            <body>
                <h1>Table-1</h1>
                <table border="2"> 
                    <tr> 
                        <th>Product name</th> 
                        <th>Manufacturer id</th> 
                        <th>Description</th> 
                        <th>USD price</th> 
                    </tr>
                    <xsl:for-each select="products/product"> 
                    <xsl:if test="@shippable='true'">
                        <tr> 
                            <td><xsl:value-of select="productName"/></td> 
                            <td><xsl:value-of select="manufacturer/@id"/></td> 
                            <td><xsl:value-of select="description"/></td> 
                            <td><xsl:value-of select="prices/price"/></td> 
                        </tr> 
                    </xsl:if>
                    </xsl:for-each> 
                </table> 

                <h1>Table-2</h1>

                <table border="2">
                    <tr>
                        <th>Product name</th>
                        <th>Description</th>
                        <th>USD price</th>
                        <th>Euro price</th>
                    </tr>
                    <xsl:for-each select="products/product">
                    <xsl:if test="manufacturer/@id='acme'">
                        <tr>
                            <td> <xsl:value-of select="productName"/></td>
                            <td> <xsl:value-of select="description"/></td>
                            <td> <xsl:value-of select="prices/price[1]"/></td>
                            <td> <xsl:value-of select="prices/price[3]"/></td>
                        </tr>
                    </xsl:if>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>