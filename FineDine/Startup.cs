﻿using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(FineDine.Startup))]
namespace FineDine
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
