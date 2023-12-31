USE [master]
GO
/****** Object:  Database [robi-service]    Script Date: 4/28/2023 11:33:01 AM ******/
CREATE DATABASE [robi-service]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'robi-service', FILENAME = N'/var/opt/mssql/data/robi-service.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 10%)
 LOG ON 
( NAME = N'robi-service_log', FILENAME = N'/var/opt/mssql/data/robi-service_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [robi-service] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [robi-service].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [robi-service] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [robi-service] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [robi-service] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [robi-service] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [robi-service] SET ARITHABORT OFF 
GO
ALTER DATABASE [robi-service] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [robi-service] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [robi-service] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [robi-service] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [robi-service] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [robi-service] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [robi-service] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [robi-service] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [robi-service] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [robi-service] SET  DISABLE_BROKER 
GO
ALTER DATABASE [robi-service] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [robi-service] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [robi-service] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [robi-service] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [robi-service] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [robi-service] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [robi-service] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [robi-service] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [robi-service] SET  MULTI_USER 
GO
ALTER DATABASE [robi-service] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [robi-service] SET DB_CHAINING OFF 
GO
ALTER DATABASE [robi-service] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [robi-service] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [robi-service] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [robi-service] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [robi-service] SET QUERY_STORE = OFF
GO
USE [robi-service]
GO
/****** Object:  Table [dbo].[EliteService]    Script Date: 4/28/2023 11:33:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EliteService](
	[EliteCategory] [nvarchar](50) NOT NULL,
	[OfferCategory] [nvarchar](50) NOT NULL,
	[Company_name] [nvarchar](50) NOT NULL,
	[OfferRate] [tinyint] NOT NULL,
	[Code] [nvarchar](50) NOT NULL,
	[Validity] [date] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[service]    Script Date: 4/28/2023 11:33:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[service](
	[Code] [varchar](50) NOT NULL,
	[Package_type] [varchar](50) NOT NULL,
	[InternetVolume] [float] NOT NULL,
	[VoiceVolume] [int] NOT NULL,
	[Validity] [int] NOT NULL,
	[Amount] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Status]    Script Date: 4/28/2023 11:33:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Status](
	[Number] [int] NOT NULL,
	[Balance] [float] NULL,
	[DataVol] [nvarchar](50) NULL,
	[DataVal] [nvarchar](50) NULL,
	[MinVol] [nvarchar](50) NULL,
	[MinVal] [nvarchar](50) NULL,
	[Points] [smallint] NULL,
	[EliteCat] [nvarchar](50) NULL,
 CONSTRAINT [PK_Status] PRIMARY KEY CLUSTERED 
(
	[Number] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
USE [master]
GO
ALTER DATABASE [robi-service] SET  READ_WRITE 
GO
