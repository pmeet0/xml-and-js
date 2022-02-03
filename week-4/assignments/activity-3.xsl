<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">   
    <xsl:template match="/"> 
    <html> 
        <body> 
            <main>
                <h1>Product-Name</h1>
            </main>
            <ul> 
                <xsl:for-each select="products/product">
                <li><xsl:value-of select="productName"/></li>
                </xsl:for-each>
            </ul>
        </body>
    </html>
    </xsl:template>
</xsl:stylesheet>   